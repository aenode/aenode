import { generateSecret, generateURI } from 'otplib';
export function otp(issuer: string, label: string) {
  const secret = generateSecret();

  return generateURI({
    issuer,
    label,
    secret,
  });
}
