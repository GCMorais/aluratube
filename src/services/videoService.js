import { createClient } from "@supabase/supabase-js";

const PROJECT_URL = "https://jprwjorsfjhuwmkbyqrp.supabase.co";
const PROJECT_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impwcndqb3JzZmpodXdta2J5cXJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njg0MzMyNjIsImV4cCI6MTk4NDAwOTI2Mn0.RElSn3b0fLKBV9cL_Ntk858s3S-copo6zQsW9e0K1D4";
const supabase = createClient(PROJECT_URL, PROJECT_KEY);

export function videoService() {
    return {
        getAllVideos() {
            return supabase.from("video")
                .select("*");
        }
    }
}