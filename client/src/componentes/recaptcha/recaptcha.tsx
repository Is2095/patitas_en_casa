'use client'

import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

export default function Recaptcha({ setNoRobot }: { setNoRobot: any }) {

    const [sitekey, setSitekey] = useState(process.env.NEXT_PUBLIC_CLAVE_DE_SITIO_RECAPTCHA);

    function onChange(value: string | null) {
        if (value?.length !== 0) {
            setNoRobot(true);
        } else setNoRobot(false);

    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const recaptchaRespuesta = e.currentTarget['g-recaptcha-response'].value;
    };

    return (
        <div>
            {sitekey &&
                <ReCAPTCHA
                    sitekey={sitekey as string}
                    onChange={onChange}
                />
            }
        </div>
    );
};