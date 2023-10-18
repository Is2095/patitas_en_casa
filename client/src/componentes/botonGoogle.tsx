"use client"

import { useSession, signIn } from "next-auth/react";

function BotonGoogle() {

    const { data: session, status } = useSession();

    return (

        <div>
            <button onClick={() => signIn("google", { callbackUrl: '/', redirect: false })} type="button" className="bg-red-600 text-white px-4 py-2 rounded-lg">
                Continuar con Google
            </button>
        </div>

    );

};

export default BotonGoogle;
