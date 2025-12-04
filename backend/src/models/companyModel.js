import pool from "../config/database.js"

export const createCompanyProfile = async (userId, companyData) => {
  const {
    company_name,
    address,
    city,
    state,
    country,
    postal_code,
    website,
    industry,
    founded_date,
    description,
    logo_url,
    banner_url,
    social_links,
  } = companyData

  const query = `
    INSERT INTO company_profile 
    (owner_id, company_name, address, city, state, country, postal_code, website, industry, founded_date, description, logo_url, banner_url, social_links)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
    RETURNING *
  `

  const result = await pool.query(query, [
    userId,
    company_name,
    address,
    city,
    state,
    country,
    postal_code,
    website || null,
    industry,
    founded_date || null,
    description || null,
    logo_url || null,
    banner_url || null,
    social_links || null,
  ])

  return result.rows[0]
}

export const getCompanyProfileByUserId = async (userId) => {
  const query = "SELECT * FROM company_profile WHERE owner_id = $1"
  const result = await pool.query(query, [userId])
  return result.rows[0]
}

export const getCompanyProfileById = async (companyId) => {
  const query = "SELECT * FROM company_profile WHERE id = $1"
  const result = await pool.query(query, [companyId])
  return result.rows[0]
}

export const updateCompanyProfile = async (companyId, companyData) => {
  const {
    company_name,
    address,
    city,
    state,
    country,
    postal_code,
    website,
    industry,
    founded_date,
    description,
    logo_url,
    banner_url,
    social_links,
  } = companyData

  const query = `
    UPDATE company_profile
    SET 
      company_name = COALESCE($1, company_name),
      address = COALESCE($2, address),
      city = COALESCE($3, city),
      state = COALESCE($4, state),
      country = COALESCE($5, country),
      postal_code = COALESCE($6, postal_code),
      website = COALESCE($7, website),
      industry = COALESCE($8, industry),
      founded_date = COALESCE($9, founded_date),
      description = COALESCE($10, description),
      logo_url = COALESCE($11, logo_url),
      banner_url = COALESCE($12, banner_url),
      social_links = COALESCE($13, social_links),
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $14
    RETURNING *
  `

  const result = await pool.query(query, [
    company_name,
    address,
    city,
    state,
    country,
    postal_code,
    website,
    industry,
    founded_date,
    description,
    logo_url,
    banner_url,
    social_links,
    companyId,
  ])

  return result.rows[0]
}
