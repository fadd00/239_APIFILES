module.exports = (sequelize, DataTypes) => {
    const Komik = sequelize.define('Komik', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        tittle: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.STRING,
        },
        author: {
            type: DataTypes.STRING,
        },
        imageType: DataTypes.STRING,
        imagePath: DataTypes.STRING,
        imageData: DataTypes.BLOB('long'),
    },
        {
            tableName: 'komik',
        });

    return Komik;
};
