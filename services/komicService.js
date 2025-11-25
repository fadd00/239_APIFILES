async function createKomik(database, komikData) {
    // Handle potential typo in DB schema: allow 'title' from input to map to 'tittle'
    let { tittle, title, description, author, imageType, imageName, imageData } = komikData;

    // If tittle is missing but title is present, use title
    if (!tittle && title) {
        tittle = title;
    }

    if (!tittle || !description || !author) {
        throw new Error('Title, description, dan author wajib diisi');
    }

    const newKomik = await database.Komik.create({
        tittle,
        description,
        author,
        imageType: imageType || null,
        imageName: imageName || null,
        imageData: imageData || null,
    });

    // Reload to get the instance with default values if any, 
    // but more importantly, let's return a safe object without the huge image buffer
    const result = newKomik.toJSON();
    if (result.imageData) {
        result.imageData = "Image uploaded successfully"; // Don't send the raw buffer back
    }

    return result;
}

async function getAllKomik(database) {
    const komiks = await database.Komik.findAll();

    return komiks.map(k => {
        if (k.imageData) {
            k.imageData = k.imageData.toString('base64');
        }
        return k;
    });
}

async function getKomikById(database, id) {
    const komik = await database.Komik.findByPk(id);
    if (!komik) throw new Error('Komik tidak ditemukan');

    if (komik.imageData) {
        komik.imageData = komik.imageData.toString('base64');
    }

    return komik;
}

async function updateKomik(database, id, komikData) {
    const komik = await database.Komik.findByPk(id);
    if (!komik) {
        throw new Error(`Komik dengan ID ${id} tidak ditemukan`);
    }

    await komik.update(komikData);
    return komik;
}

async function deleteKomik(database, id) {
    const komik = await database.Komik.findByPk(id);
    if (!komik) {
        throw new Error(`Komik dengan ID ${id} tidak ditemukan`);
    }

    await komik.destroy();
    return { message: `Komik dengan ID ${id} berhasil dihapus` };
}

module.exports = {
    createKomik,
    getAllKomik,
    getKomikById,
    updateKomik,
    deleteKomik,
};