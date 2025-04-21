'use server'

import { signIn, signOut } from "../../auth";

export async function doLogout() {
  await signOut({ redirectTo: "/" });
}

export async function doCredentialLogin(formData: FormData): Promise<any> {
  
  const email = formData.get("email") as string; 
  const password = formData.get("password") as string; 

  try {
    const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      return response;
   } catch (err: any) {
      throw err;
   }
} 

export async function doSaveSettings(formData: FormData): Promise<any> {
    const selectedAmenities = formData.getAll('amenities'); 

    console.log('Selected amenities:', selectedAmenities);
    // I'm unsure of what to do with this data.
}