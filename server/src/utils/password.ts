const bcrypt = require('bcryptjs')

export const hashPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hashSync(password, salt);
    return hashedPassword;
};

export const comparePassword = async (password: string, hashedPassword: string): Promise<Boolean> => {
    return await bcrypt.compare(password, hashedPassword);
};