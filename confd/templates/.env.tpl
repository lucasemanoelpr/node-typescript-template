OBSERVABILITY_JAEGER_ENDPOINT="{{ getv "/observability/jaeger_endpoint" "" }}"

MONGO_DB_URI="{{ getv "/mongo/uri" }}"
MONGO_DB_DATABASE="{{ getv "/mongo/database" }}"
MONGO_DB_PREFIX="{{ getv "/mongo/prefix" "" }}"

LOGGING_QUEUE_URL="{{ getv "/logging/queue_url" }}"
