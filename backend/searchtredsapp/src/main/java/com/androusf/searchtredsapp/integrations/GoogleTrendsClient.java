package com.androusf.searchtredsapp.integrations;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.auth.oauth2.ServiceAccountCredentials;
import com.google.cloud.bigquery.BigQuery;
import com.google.cloud.bigquery.BigQueryOptions;
import com.google.cloud.bigquery.Job;
import com.google.cloud.bigquery.JobId;
import com.google.cloud.bigquery.JobInfo;
import com.google.cloud.bigquery.QueryJobConfiguration;
import com.google.cloud.bigquery.TableResult;
import java.io.FileInputStream;
import java.util.UUID;

/**
 * Cliente para interactuar con Google BigQuery y obtener datos de Google Trends.
 */
public class GoogleTrendsClient {

    private final BigQuery bigQuery;

    /**
     * Constructor para crear una instancia de GoogleTrendsClient.
     *
     * @param pathToCredentials Ruta al archivo de credenciales de Google Cloud.
     * @param projectId ID del proyecto en Google Cloud.
     * @throws Exception Si ocurre un error al leer las credenciales o configurar BigQuery.
     */
    public GoogleTrendsClient(String pathToCredentials, String projectId) throws Exception {
        GoogleCredentials credentials = ServiceAccountCredentials.fromStream(new FileInputStream(pathToCredentials));
        this.bigQuery = BigQueryOptions.newBuilder().setProjectId(projectId).setCredentials(credentials).build().getService();
    }

    /**
     * Ejecuta una consulta en BigQuery y devuelve los resultados.
     *
     * @param queryString La consulta SQL para ejecutar en BigQuery.
     * @return TableResult Resultados de la consulta.
     * @throws InterruptedException Si la ejecución de la consulta es interrumpida.
     */
    public TableResult executeQuery(String queryString) throws InterruptedException {
        QueryJobConfiguration queryConfig = QueryJobConfiguration.newBuilder(queryString)
                .setUseLegacySql(false)
                .build();

        JobId jobId = JobId.of(UUID.randomUUID().toString());
        Job queryJob = bigQuery.create(JobInfo.newBuilder(queryConfig).setJobId(jobId).build());

        queryJob = queryJob.waitFor();

        if (queryJob == null) {
            throw new RuntimeException("Job no longer exists");
        } else if (queryJob.getStatus().getError() != null) {
            throw new RuntimeException(queryJob.getStatus().getError().toString());
        }

        return queryJob.getQueryResults();
    }
}
