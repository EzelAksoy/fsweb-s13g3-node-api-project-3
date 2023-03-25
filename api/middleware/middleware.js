const posts_model = require("../users/users-model");

function logger(req, res, next) {
  // SİHRİNİZİ GÖRELİM
  const method = req.method;
  const url = req.originalUrl;
  const timestamp = new Date().toLocaleString();
  console.log(`${timestamp}--${method}--${url}`);
  next();
}

async function validateUserId(req, res, next) {
  // SİHRİNİZİ GÖRELİM
  try {
    let id = await posts_model.getById(req.params.id);
    if (!id) {
      res.status(404).json({ mesaj: "kullanıcı bulunamadı not found" });
    } else {
      req.user = id;
    }
    next();
  } catch (error) {
    res.status(500).json({ mesaj: "hata dönüldü." });
    next(error);
  }
}

function validateUser(req, res, next) {
  // SİHRİNİZİ GÖRELİM
  let name = req.body.name;
  try {
    if (!name) {
      res.status(400).json({ mesaj: "gerekli name alanı eksik" });
    } else {
      req.name = name;
      next();
    }
  } catch (error) {
    res.status(500).json({ mesaj: "Hata Alındı." });
    next(error);
  }
}

function validatePost(req, res, next) {
  // SİHRİNİZİ GÖRELİM
  let text = req.body.text;
  try {
    if (!text) {
      res.status(400).json({ mesaj: "gerekli text alanı eksik" });
    } else {
      req.text = text;
      next();
    }
  } catch (error) {
    res.status(500).json({ mesaj: "Hata Alındı." });
    next(error);
  }
}

// bu işlevleri diğer modüllere değdirmeyi unutmayın

module.exports = { logger, validateUserId, validateUser, validatePost };
