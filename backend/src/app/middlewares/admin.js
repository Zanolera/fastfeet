import User from '../models/User';

export default async (req, res, next) => {
    const checkIsAdmin = await User.findByPk(req.userId);

    if (!checkIsAdmin) {
        return res.status(401).json({
            error: 'Acess Unauthorized.',
        });
    }
    return next();
};
