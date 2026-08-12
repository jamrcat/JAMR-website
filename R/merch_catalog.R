# Base Running Merch Concept
# Reusable Shiny UI section for a catalog-style merch page.
# Product photos should be placed in www/images using the filenames below.

merch_products <- list(
  short_sleeve = list(
    name = "Short Sleeve Performance Shirt",
    short = "Short Sleeve",
    price = 35,
    image = "images/short-sleeve.jpg"
  ),
  long_sleeve = list(
    name = "Long Sleeve Performance Shirt",
    short = "Long Sleeve",
    price = 45,
    image = "images/long-sleeve.jpg"
  ),
  hoodie = list(
    name = "Sleeveless Performance Hoodie",
    short = "Sleeveless Hoodie",
    price = 54,
    image = "images/hoodie.jpg"
  ),
  training_shorts = list(
    name = "Training Shorts with Compression Liner",
    short = "Training Shorts",
    price = 34,
    image = "images/training-shorts.jpg"
  )
)

merch_bundles <- list(
  list(
    name = "Curvilinear Ability Set",
    price = 66,
    products = c("short_sleeve", "training_shorts"),
    topic = "Curvilinear ability"
  ),
  list(
    name = "Linear–Curvilinear Set",
    price = 75,
    products = c("long_sleeve", "training_shorts"),
    topic = "Linear and curvilinear characteristics"
  ),
  list(
    name = "Inside–Outside Mechanics Set",
    price = 84,
    products = c("hoodie", "training_shorts"),
    topic = "Inside–outside foot mechanics"
  ),
  list(
    name = "The Need for Speed Set",
    price = 76,
    products = c("short_sleeve", "long_sleeve"),
    topic = "The need for speed"
  ),
  list(
    name = "GPS Diagnostics Set",
    price = 85,
    products = c("short_sleeve", "hoodie"),
    topic = "GPS-based base running diagnostics"
  ),
  list(
    name = "IMU Foot-Pod Set",
    price = 94,
    products = c("long_sleeve", "hoodie"),
    topic = "IMU foot-pod diagnostics"
  ),
  list(
    name = "Segment-Specific Analysis Set",
    price = 105,
    products = c("short_sleeve", "long_sleeve", "training_shorts"),
    topic = "Segment-specific analysis"
  ),
  list(
    name = "Functional Asymmetry Set",
    price = 114,
    products = c("short_sleeve", "hoodie", "training_shorts"),
    topic = "Functional asymmetries"
  ),
  list(
    name = "Velocity–Time Profile Set",
    price = 123,
    products = c("long_sleeve", "hoodie", "training_shorts"),
    topic = "Velocity–time profiles"
  ),
  list(
    name = "New Perspectives Set",
    price = 124,
    products = c("short_sleeve", "long_sleeve", "hoodie"),
    topic = "New perspectives on analysing base running"
  ),
  list(
    name = "Training the Curve Complete Set",
    price = 152,
    products = c("short_sleeve", "long_sleeve", "hoodie", "training_shorts"),
    topic = "Training the curve"
  )
)

merch_money <- function(x) sprintf("$%0.0f", x)

merch_product_card <- function(product) {
  shiny::tags$article(
    class = "brs-product-card",
    shiny::tags$div(
      class = "brs-photo-frame",
      shiny::tags$img(
        src = product$image,
        alt = product$name,
        class = "brs-product-photo",
        onerror = "this.style.display='none'; this.parentNode.classList.add('brs-photo-missing');"
      ),
      shiny::tags$span(class = "brs-photo-placeholder", "Add product photo")
    ),
    shiny::tags$div(
      class = "brs-card-copy",
      shiny::tags$h3(product$short),
      shiny::tags$p(class = "brs-price", merch_money(product$price))
    )
  )
}

merch_bundle_card <- function(bundle, bundle_number) {
  items <- merch_products[bundle$products]
  regular_price <- sum(vapply(items, function(x) x$price, numeric(1)))
  savings <- regular_price - bundle$price

  shiny::tags$article(
    class = "brs-bundle-card",
    shiny::tags$div(
      class = "brs-bundle-topline",
      shiny::tags$span(class = "brs-bundle-number", sprintf("%02d", bundle_number)),
      shiny::tags$span(class = "brs-topic", bundle$topic)
    ),
    shiny::tags$h3(bundle$name),
    shiny::tags$div(
      class = "brs-bundle-images",
      lapply(items, function(product) {
        shiny::tags$div(
          class = "brs-mini-photo-frame",
          shiny::tags$img(
            src = product$image,
            alt = product$short,
            class = "brs-mini-photo",
            onerror = "this.style.display='none'; this.parentNode.classList.add('brs-mini-missing');"
          ),
          shiny::tags$span(class = "brs-mini-placeholder", product$short)
        )
      })
    ),
    shiny::tags$p(
      class = "brs-includes",
      paste(vapply(items, function(x) x$short, character(1)), collapse = " + ")
    ),
    shiny::tags$div(
      class = "brs-bundle-pricing",
      shiny::tags$div(
        shiny::tags$span(class = "brs-label", "Set price"),
        shiny::tags$strong(class = "brs-bundle-price", merch_money(bundle$price))
      ),
      shiny::tags$div(
        class = "brs-savings",
        shiny::tags$span("Regular ", shiny::tags$s(merch_money(regular_price))),
        if (savings > 0) shiny::tags$span(paste0(" · Save ", merch_money(savings)))
      )
    )
  )
}

merch_catalog_ui <- function() {
  shiny::tags$section(
    id = "base-running-merch-concept",
    class = "brs-merch-section",

    shiny::tags$div(
      class = "brs-merch-hero",
      shiny::tags$p(class = "brs-eyebrow", "BASE RUNNING SCIENCE"),
      shiny::tags$h1("Base Running Merch Concept"),
      shiny::tags$p(
        class = "brs-intro",
        "A research-inspired apparel catalog built around topics developed in the Base Running Science thesis."
      )
    ),

    shiny::tags$div(
      class = "brs-section-heading",
      shiny::tags$h2("Individual Pieces"),
      shiny::tags$p("Current concept prices before shipping.")
    ),
    shiny::tags$div(
      class = "brs-product-grid",
      lapply(merch_products, merch_product_card)
    ),

    shiny::tags$div(
      class = "brs-section-heading brs-bundle-heading",
      shiny::tags$h2("Research-Inspired Sets"),
      shiny::tags$p("Each set name references a distinct topic or analytical concept from the thesis.")
    ),
    shiny::tags$div(
      class = "brs-bundle-grid",
      Map(merch_bundle_card, merch_bundles, seq_along(merch_bundles))
    ),

    shiny::tags$p(
      class = "brs-catalog-note",
      "Concept pricing. Shipping is calculated separately. Product photos can be replaced without changing the catalog code."
    )
  )
}
