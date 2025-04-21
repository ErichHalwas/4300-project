"use client";
import Link from "next/link";
import { doCredentialLogin, doSaveSettings } from "../app/actions";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { AmenityCheckbox } from './AmenityCheckbox';

const Settings = () => {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [showElevators, setShowElevators] = useState(true);
  const [showBathrooms, setShowBathrooms] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);

      const response = await doSaveSettings(formData);

      if (response?.error) {
        console.error(response.error);
        setError(response.error.message || "An error occurred");
      } else {
      }
    } catch (e: any) {
      console.error(e);
      setError("Check your Credentials");
    }
  }

  return (
    <div className='ShowItemList'>
        <div className="grid mt-8 justify-items-center"> 
            <div className="shadow-lg p-5 rounded-lg border-t-4 bg-white border-red-700">
                <h1 className="text-xl text-slate-600 font-bold my-4">Settings</h1>
                {error && <div className="text-lg text-red-500">{error}</div>}
                <form
                    onSubmit={onSubmit}
                    className="my-8 max-w-md mx-auto flex flex-col gap-4 border p-6 border-gray-300 rounded-md shadow-sm bg-white"
                >

                    <AmenityCheckbox id="elevators" label="Elevators" name="amenities" />
                    <AmenityCheckbox id="stairs" label="Stairs" name="amenities" />
                    <AmenityCheckbox id="ramps" label="Ramps" name="amenities" />
                    <AmenityCheckbox id="genderNeutralBathrooms" label="Gender Neutral Bathrooms" name="amenities" />
                    <AmenityCheckbox id="accessibleBathrooms" label="Accessible Bathrooms" name="amenities" />

                    <button
                        type="submit"
                        className="bg-red-700 text-white rounded px-4 py-2 mt-2 hover:bg-red-800 transition"
                    >
                        Save    
                    </button>
                </form>
            </div>
        </div>
    </div>
  );
};

export default Settings;