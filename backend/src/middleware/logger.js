const logger = (req, res, next) => {
  const startTime = Date.now()
  const { method, url, headers } = req

  console.log(`[v0] REQUEST: ${method} ${url}`)
  console.log(`[v0] Headers:`, { authorization: headers.authorization ? "***" : "none" })

  res.on("finish", () => {
    const duration = Date.now() - startTime
    const statusClass = res.statusCode >= 400 ? "ERROR" : "SUCCESS"
    console.log(`[v0] ${statusClass}: ${method} ${url} - Status: ${res.statusCode} - Duration: ${duration}ms`)
  })

  next()
}

module.exports = logger
