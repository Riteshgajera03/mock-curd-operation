const User = require("../models/User");

exports.list = async (req, res) => {
    let search = req.query.search || "";
    let limit = parseInt(req.query.limit) || 5;
    let page = parseInt(req.query.page) || 1;
    let skip = (page - 1) * limit;

    let query = {
        status: true,
        $or: [
            { name: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
            { phone: { $regex: search, $options: "i" } }
        ]
    };

    const total = await User.countDocuments(query);
    const users = await User.find(query).skip(skip).limit(limit);

    res.render("index", { users, total, page, limit, search });
};

exports.createForm = (req, res) => {
    res.render("form", { user: null });
};

exports.create = async (req, res) => {
    await User.create({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        image: req.file ? req.file.filename : "",
        created_date: new Date().toLocaleString(),
        updated_date: new Date().toLocaleString()
    });
    res.redirect("/");
};

exports.softDelete = async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, { status: false });
    res.redirect("/");
};

exports.multiDelete = async (req, res) => {
    let ids = req.body.ids;
    await User.updateMany({ _id: { $in: ids } }, { status: false });
    res.redirect("/");
};