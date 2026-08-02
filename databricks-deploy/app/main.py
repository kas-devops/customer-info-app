from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from databricks.sdk import WorkspaceClient
import os

app = FastAPI()
w = WorkspaceClient()

WAREHOUSE_ID = os.environ.get("DATABRICKS_WAREHOUSE_ID")

@app.get("/api/customers")
def get_customers():
    result = w.statement_execution.execute_statement(
        warehouse_id=WAREHOUSE_ID,
        statement="SELECT customer_id, name, email, phone, city FROM main.customer_app.customer_info",
        wait_timeout="30s"
    )
    if result.manifest is None:
        return {"error": "query did not complete", "status": str(result.status)}
    columns = [c.name for c in result.manifest.schema.columns]
    rows = result.result.data_array or []
    data = [dict(zip(columns, row)) for row in rows]
    return {"customers": data}

app.mount("/", StaticFiles(directory="dist", html=True), name="static")