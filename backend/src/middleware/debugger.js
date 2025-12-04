const debugRequest = (req, res, next) => {
  if (process.env.DEBUG_MODE === "true") {
    console.log("[v0] ==== REQUEST DEBUG ====")
    console.log("[v0] Method:", req.method)
    console.log("[v0] URL:", req.originalUrl)
    console.log("[v0] Headers:", JSON.stringify(req.headers, null, 2))
    console.log("[v0] Body:", JSON.stringify(req.body, null, 2))
    console.log("[v0] ========================")
  }

  const originalSend = res.send
  res.send = function (data) {
    if (process.env.DEBUG_MODE === "true") {
      console.log("[v0] ==== RESPONSE DEBUG ====")
      console.log("[v0] Status:", res.statusCode)
      console.log("[v0] Body:", typeof data === "string" ? data : JSON.stringify(data, null, 2))
      console.log("[v0] ==========================")
    }
    return originalSend.call(this, data)
  }

  next()
}

module.exports = debugRequest
