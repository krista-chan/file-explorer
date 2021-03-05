use routes;
use actix_web::{get, App, HttpServer, HttpResponse};

#[get("/")]
async fn index () -> HttpResponse {
    HttpResponse::Ok()
        .content_type("plain/text")
        .body("test")
}


#[actix_web::main]
async fn main() -> std::io::Result<()> {
    println!("API running on http://localhost:8000");
    HttpServer::new(|| App::new().service(index))
        .bind("127.0.0.1:8000")?
        .run()
        .await
}