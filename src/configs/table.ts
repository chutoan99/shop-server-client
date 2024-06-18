import connectMySQL from './mysql'

const CreateTable = async () => {
	const pool = connectMySQL()
	const db = await pool.getConnection()

	db.query(`
  CREATE TABLE IF NOT EXISTS Banners (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    image_url VARCHAR(255),
    is_active BOOLEAN DEFAULT true,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleteAt TIMESTAMP
  )`)

	db.query(`
  CREATE TABLE IF NOT EXISTS BatchLists (
    id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    banner_image VARCHAR(255),
    title VARCHAR(255),
    end VARCHAR(255),
    start VARCHAR(255),
    is_active BOOLEAN DEFAULT true,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleteAt TIMESTAMP
  )`)

	db.query(`
  CREATE TABLE IF NOT EXISTS Carts (
    id BIGINT PRIMARY KEY NOT NULL,
    userid BIGINT,
    itemid BIGINT,
    shopid BIGINT,
    amount INTEGER,
    tierVariation VARCHAR(255),
    item_option VARCHAR(255),
    is_active BOOLEAN DEFAULT true,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleteAt TIMESTAMP
  )`)

	db.query(`
  CREATE TABLE IF NOT EXISTS Comments (
      id BIGINT PRIMARY KEY NOT NULL,
      parent_cmtid BIGINT,
      userid BIGINT,
      shopid BIGINT,
      orderid BIGINT,
      itemid BIGINT,
      level INT,
      is_shop BOOLEAN,
      rating INT,
      comment VARCHAR(1000),
      rating_star INT,
      status INT,
      author_username VARCHAR(255),
      author_portrait VARCHAR(255),
      images VARCHAR(255),
      cover VARCHAR(255),
      videos VARCHAR(255),
      tierVariation VARCHAR(255),
      list_option VARCHAR(255),
      is_replied BOOLEAN,
      like_count INT,
      liked BOOLEAN,
      is_active BOOLEAN DEFAULT true,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      deleteAt TIMESTAMP
  )`)

	db.query(`
  CREATE TABLE IF NOT EXISTS DeepDiscountSkins (
    id BIGINT PRIMARY KEY NOT NULL,
    promotion_price VARCHAR(255),
    hidden_promotion_price VARCHAR(255),
    text VARCHAR(255),
    start_time VARCHAR(255),
    end_time VARCHAR(255),
    is_active BOOLEAN DEFAULT true,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleteAt TIMESTAMP
  )`)

	db.query(`
  CREATE TABLE IF NOT EXISTS FlashSales (
    id BIGINT PRIMARY KEY NOT NULL,
    shopid BIGINT,
    catid BIGINT,
    name VARCHAR(1000),
    image VARCHAR(1000),
    price INTEGER,
    price_before_discount INTEGER,
    stock INTEGER,
    historical_sold INTEGER,
    discount VARCHAR(255),
    shop_rating INTEGER,
    filename VARCHAR(255),
    liked BOOLEAN,
    is_official_shop BOOLEAN,
    is_service_by_shopee BOOLEAN,
    show_free_shipping BOOLEAN,
    start_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    end_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT true,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleteAt TIMESTAMP
  )`)

	db.query(`
  CREATE TABLE IF NOT EXISTS HomeCategories (
    id BIGINT PRIMARY KEY NOT NULL,
    display_name VARCHAR(255),
    parent_catid INTEGER,
    name VARCHAR(255),
    image VARCHAR(1000),
    unselected_image VARCHAR(255),
    selected_image VARCHAR(255),
    level INTEGER,
    is_active BOOLEAN DEFAULT true,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleteAt TIMESTAMP
  )`)

	db.query(`
  CREATE TABLE IF NOT EXISTS Industries (
    id INTEGER PRIMARY KEY NOT NULL,
    parent_catid INTEGER,
    level INTEGER,
    category_name VARCHAR(255),
    images VARCHAR(255),
    is_active BOOLEAN DEFAULT true,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleteAt TIMESTAMP
  )`)
	//* Likes
	db.query(`
  CREATE TABLE IF NOT EXISTS Likes (
    id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    userid BIGINT,
    itemid BIGINT,
    shopid BIGINT,
    is_active BOOLEAN DEFAULT true,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleteAt TIMESTAMP
  )`)

	db.query(`
  CREATE TABLE IF NOT EXISTS Notifications (
    id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    image VARCHAR(255),
    title VARCHAR(255),
    content VARCHAR(255),
    userid BIGINT,
    seen BOOLEAN,
    time VARCHAR(255),
    is_active BOOLEAN DEFAULT true,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleteAt TIMESTAMP
  )`)

	db.query(`
  CREATE TABLE IF NOT EXISTS Orders (
    id BIGINT PRIMARY KEY NOT NULL,
    userid BIGINT,
    shopid BIGINT,
    shop_name VARCHAR(255),
    type INTEGER,
    state VARCHAR(255),
    total_num_items INTEGER,
    note VARCHAR(255),
    amount VARCHAR(255),
    item_option VARCHAR(255),
    item_groups_id VARCHAR(255),
    tierVariation VARCHAR(255),
    final_total INTEGER,
    is_active BOOLEAN DEFAULT true,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleteAt TIMESTAMP
  )`)

	db.query(`
  CREATE TABLE IF NOT EXISTS Posts (
    id BIGINT PRIMARY KEY NOT NULL,
    shopid BIGINT,
    catid INT,
    videoid VARCHAR(255),
    promotionid BIGINT,
    discountid BIGINT,
    currency VARCHAR(255),
    stock INT,
    status INT,
    sold INT,
    liked_count INT,
    cmt_count INT,
    discount VARCHAR(255),
    raw_discount INT,
    size_chart VARCHAR(255),
    shop_name VARCHAR(255),
    description VARCHAR(255),
    transparent_background_image VARCHAR(255),
    images VARCHAR(1000),
    view_count INT,
    name VARCHAR(1000),
    image VARCHAR(1000),
    price INT,
    price_min INT,
    price_max INT,
    historical_sold INT,
    price_before_discount INT,
    price_min_before_discount INT,
    price_max_before_discount INT,
    shop_rating INT,
    filename VARCHAR(255),
    liked BOOLEAN,
    is_official_shop BOOLEAN,
    is_service_by_shop BOOLEAN,
    show_free_shipping BOOLEAN,
    name_attributes TEXT,
    value_attributes VARCHAR(1000),
    name_tierVariations VARCHAR(255),
    option_tierVariations VARCHAR(1000),
    images_tierVariations VARCHAR(1000),
    is_active BOOLEAN DEFAULT true,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleteAt TIMESTAMP
  )`)

	db.query(`
  CREATE TABLE IF NOT EXISTS Rooms (
    id INTEGER PRIMARY KEY NOT NULL,
    userid BIGINT,
    shopid BIGINT,
    is_active BOOLEAN DEFAULT true,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleteAt TIMESTAMP
  )`)

	db.query(`
  CREATE TABLE IF NOT EXISTS SearchHistories (
    id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    userid BIGINT,
    text VARCHAR(255),
    is_active BOOLEAN DEFAULT true,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleteAt TIMESTAMP
  )`)

	db.query(`
  CREATE TABLE IF NOT EXISTS SearchSuggestions (
    id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    text VARCHAR(255),
    count INTEGER,
    is_active BOOLEAN DEFAULT true,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleteAt TIMESTAMP
  )`)

	db.query(`
  CREATE TABLE IF NOT EXISTS ShopMalls (
    id BIGINT PRIMARY KEY NOT NULL,
    url VARCHAR(255),
    image VARCHAR(255),
    promo_text VARCHAR(255),
    is_active BOOLEAN DEFAULT true,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleteAt TIMESTAMP
  )`)

	db.query(`
  CREATE TABLE IF NOT EXISTS Shops (
    id BIGINT PRIMARY KEY NOT NULL,
    userid BIGINT,
    item_count INT,
    name VARCHAR(255),
    cover VARCHAR(255),
    follower_count INT,
    rating_star INT,
    rating_bad INT,
    rating_good INT,
    rating_normal INT,
    status INT,
    shop_location VARCHAR(255),
    username VARCHAR(255),
    portrait VARCHAR(255),
    response_rate INT,
    country VARCHAR(255),
    response_time INT,
    description VARCHAR(255),
    followed BOOLEAN,
    last_active_time TIMESTAMP,
    is_official_shop BOOLEAN,
    is_active BOOLEAN DEFAULT true,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleteAt TIMESTAMP
  )`)

	db.query(`
  CREATE TABLE IF NOT EXISTS TopProducts (
      id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
      data_type VARCHAR(255),
      count INT,
      name VARCHAR(255),
      images VARCHAR(255),
      sort_type INT,
      best_price INT,
      display_text VARCHAR(255),
      is_active BOOLEAN DEFAULT true,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      deleteAt TIMESTAMP
  )`)

	db.query(`
  CREATE TABLE IF NOT EXISTS Users (
    id BIGINT PRIMARY KEY,
    shopid BIGINT,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    sex INT,
    role VARCHAR(255),
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    address VARCHAR(255),
    birthday TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    phone INT,
    avatar VARCHAR(255),
    filename VARCHAR(255),
    not_new_user BOOLEAN,
    refreshToken VARCHAR(255),
    passwordResetToken VARCHAR(255),
    passwordResetExpires VARCHAR(255),
    passwordChangedAt VARCHAR(255),
    is_active BOOLEAN DEFAULT true,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleteAt TIMESTAMP
  )`)

	db.query(`
  CREATE TABLE IF NOT EXISTS Videos (
    id VARCHAR(255) PRIMARY KEY NOT NULL,
    thumb_url VARCHAR(255),
    duration INT,
    version INT,
    width INT,
    height INT,
    defn VARCHAR(255),
    profile VARCHAR(255),
    url VARCHAR(255),
    is_active BOOLEAN DEFAULT true,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleteAt TIMESTAMP
  )`)

	db.query(`
  CREATE TABLE IF NOT EXISTS VoucherProducts (
      id BIGINT PRIMARY KEY NOT NULL,
      voucher_code VARCHAR(255),
      label VARCHAR(255),
      is_active BOOLEAN DEFAULT true,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      deleteAt TIMESTAMP
  )`)
}

export default CreateTable
