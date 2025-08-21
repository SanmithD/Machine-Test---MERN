import mongoose from 'mongoose';

export const dbConnect = async() =>{
    try {
        const response = await mongoose.connect(process.env.DATABASE);
        console.log('Connected', response.connection.host);
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}