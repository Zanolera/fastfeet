import File from '../models/File';

class AvatarController {
    async store(req, res) {
        const { originalname: name, filename: path } = req.file;

        const file = await File.create({
            name,
            path,
        });

        // importar model do Deliveryman e fazer o update no campo avatar_id

        return res.json(file);
    }
}

export default new AvatarController();
