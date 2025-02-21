class OTPService {
  async generateOtp() {
    const otp = Math.floor(100000 + Math.random() * 900000)
    return otp;
  }
}

export default new OTPService();