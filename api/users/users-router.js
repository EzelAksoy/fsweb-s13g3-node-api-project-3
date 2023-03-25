const express = require("express");
const middleWare = require("../middleware/middleware");
const users_model = require("./users-model");
const posts_model = require("../posts/posts-model");

// `users-model.js` ve `posts-model.js` sayfalarına ihtiyacınız var
// ara yazılım fonksiyonları da gereklidir

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let users = await users_model.get();
    res.json(users);
  } catch (error) {
    res.status(500).json({ mesaj: "Hata oluştu." });
  }
  // TÜM KULLANICILARI İÇEREN DİZİYİ DÖNDÜRÜN
});

router.get("/:id", middleWare.validateUserId, (req, res, next) => {
  // USER NESNESİNİ DÖNDÜRÜN
  // user id yi getirmek için bir ara yazılım gereklidir
  try {
    res.json(req.user);
  } catch (error) {
    res.status(500).json({ message: "Hata Dönüldü." });
  }
});

router.post("/", middleWare.validateUser, async (req, res, next) => {
  // YENİ OLUŞTURULAN USER NESNESİNİ DÖNDÜRÜN
  // istek gövdesini doğrulamak için ara yazılım gereklidir.
  try {
    let addUser = await users_model.insert({ name: req.name });
    res.status(201).json(addUser);
  } catch (error) {
    next(error);
  }
});

router.put(
  "/:id",
  middleWare.validateUserId,
  middleWare.validateUser,
  async (req, res, next) => {
    // YENİ GÜNCELLENEN USER NESNESİNİ DÖNDÜRÜN
    // user id yi doğrulayan ara yazılım gereklidir
    // ve istek gövdesini doğrulayan bir ara yazılım gereklidir.
    try {
      await users_model.update(req.params.id, { name: req.name });
      const newUsers = await users_model.getById(req.params.id);
      res.status(201).json(newUsers);
      next();
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/:id", middleWare.validateUserId, async (req, res, next) => {
  // SON SİLİNEN USER NESNESİ DÖNDÜRÜN
  // user id yi doğrulayan bir ara yazılım gereklidir.
  try {
    await users_model.remove(req.params.id);
    res.json(req.user);
    next();
  } catch (error) {
    next(error);
  }
});

router.get("/:id/posts", middleWare.validateUserId, async (req, res, next) => {
  // USER POSTLARINI İÇEREN BİR DİZİ DÖNDÜRÜN
  // user id yi doğrulayan bir ara yazılım gereklidir.
  try {
    const posts = await users_model.getUserPosts(req.params.id);
    res.json(posts);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/:id/posts",
  middleWare.validateUserId,
  middleWare.validatePost,
  async (req, res) => {
    // YENİ OLUŞTURULAN KULLANICI NESNESİNİ DÖNDÜRÜN
    // user id yi doğrulayan bir ara yazılım gereklidir.
    // ve istek gövdesini doğrulayan bir ara yazılım gereklidir.
    try {
      const result = await posts_model.insert({
        user_id: req.params.id,
        text: req.text,
      });
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

// routerı dışa aktarmayı unutmayın

module.exports = router;
