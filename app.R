library(shiny)

source("R/merch_catalog.R")

ui <- fluidPage(
  tags$head(
    tags$title("Base Running Merch Concept"),
    includeCSS("www/merch_catalog.css")
  ),
  div(
    style = "max-width: 1500px; margin: 0 auto; padding: 18px; background:#090c0e; min-height:100vh;",
    merch_catalog_ui()
  )
)

server <- function(input, output, session) {}

shinyApp(ui, server)
