package main

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import scala.concurrent.duration._

class StatusTest extends Simulation {
    val httpProtocol = http
        .baseUrl("http://localhost:8000")

    val scn = scenario("StatusTest")
        .exec(http("Check API Status")
            .get("/v1/status")
            .header("content-type", "application/json")
            .check(status.is(200))
        )
        .pause(1 seconds)

    setUp(scn.inject(
        rampUsers(100) during(30 seconds)
    ).protocols(httpProtocol))
}
