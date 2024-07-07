
import User from '../models/user.js'
export async function home(req, res) {
    try {
        let user = await User.findById(req.user._id)
            .populate('collections')
            .sort('-createdAt');
        return res.render('home.ejs', {
            collections: user.collections
        })
    } catch (err) {
        console.log(err);
        return res.render('sign_up.ejs', {
            title: 'Title'
        });
    }
};

export async function getCollection(req, res) {
    let user = await User.findById(req.user._id).populate('collections');
    return res.json({
        collections: user.collections
    })
}