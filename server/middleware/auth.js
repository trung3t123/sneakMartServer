import jwt from 'jsonwebtoken';
import User from '../models/User.js';


const auth = async (req, res, next) => {
	const token = req.header('Authorization').replace('Bearer ', '')
	const data = jwt.verify(token, "SneakMartNC")
	try {
		const user = await User.findOne({ _id: data._id, 'tokens.token': token })
		console.log('user', user);
		if (!user) {
			console.log('cant find user');
			throw new Error()
		}

		const userDetails = {
			_id: user._id,
			userPhone: user.userPhone,
			userMail: user.userMail,
		}
		req.user = userDetails
		req.token = token
		next()
	} catch (error) {
		console.log('error');
		res.status(401).send({ error: 'Not authorized to access this resource' })
	}
}

export default auth;