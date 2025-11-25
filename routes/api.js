const express = require('express');
const router = express.Router();
const multer = require('multer');
const komikcontroller = require('../controllers/komikcontroller');
const upload = multer({ storage: multer.memoryStorage() });

router.post('/komik', upload.single('image'), komikcontroller.createKomik);
router.get('/komik', komikcontroller.getAllKomik);
router.get('/komik/:id', komikcontroller.getKomikById);
router.put('/komik/:id', komikcontroller.updateKomik);
router.delete('/komik/:id', komikcontroller.deleteKomik);

module.exports = router;