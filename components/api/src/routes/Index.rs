use actix_web::{HttpResponse};

pub async fn Index() -> HttpResponse {
    HttpResponse::Ok()
        .content_type("plain/text")
        .body("Worked")
}