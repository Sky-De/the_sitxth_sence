"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export const Header = () => {
  const pathName = usePathname();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [music, setMusic] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    setMusic(new Audio("./music.mp3"));
  }, []);

  const handleMusic = () => {
    if (music) {
      if (isPlaying) {
        setIsPlaying(false);
        music.pause();
        music.currentTime = 0;
        music.loop = false;
      } else {
        music.pause();
        music.currentTime = 0;
        setIsPlaying(true);
        music.play();
        music.volume = 0.2;
        music.loop = true;
      }
    }
  };

  return (
    <header className="sticky top-0 px-4 h-[60px] bg-black flex items-center shadow-sm shadow-gray-500 z-10">
      <nav className="flex gap-6 text-white bg-black">
        <Link
          className={`${
            pathName === "/" ? "opacity-100" : "opacity-50"
          } text-lg`}
          href="/"
        >
          Home
        </Link>
        <Link
          className={`${
            pathName === "/game" ? "opacity-100" : "opacity-50"
          } text-lg`}
          href="/game"
        >
          Game
        </Link>
        <Link
          className={`${
            pathName === "/contact" ? "opacity-100" : "opacity-50"
          } text-lg`}
          href="/contact"
        >
          Contact
        </Link>
      </nav>
      {pathName === "/game" && (
        <div onClick={handleMusic} className="flex items-center gap-2 ml-auto">
          <Image
            width={25}
            height={25}
            alt="music ijcon"
            className="mx-auto"
            src={
              isPlaying
                ? "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAArZJREFUSEvVlkmoTmEcxn+PBVYyx8YUVpKF0g1FRJlK5mFhWFhQMm1dbBSRuRRJIhnKzlAuShHKwsYGmVKGUiIZevT/er/bcZzv3nOv70ve3Tnvd/6/73ne9z+If7T0j7j8n2Db3YGBkp5VnbPdU9LH9pzstGLbs4DjQF9giqSbAbP9CdgP7JD0rdYf6DDYdm/gALAsE3S7pG0J7PT+MTBT0tMieIfAtucAx4B+uWBZcOyvTvuvgAmSnufhpcBJ5WFgcSZAPK9Nz63gpHoRcBLoBjwAmiT9yML/ANseDAzN/GgIsDudZbx+AayQdMN21das4q5xtrY3AntSnG2StheCbXcBzgDxb2utuEzrJX3OnWcWfELSStshqgWYBHwFRkgK6yurVbHtpcDpGsQ3wCpJV7L7NRSHCzMkXbY9BniYvtknaUMReCtQtWNyBhCB7hSlRhvgu5KakitXgWnAR0m9isCRDs0VG6Syl67ojKvv+kt6Z3s5cCoBh0t6kre63uD5ki7aHgfcTeC5ki41GrxJ0l7bkfNvEzguZhSf3y5XvRVXwVHpPiTwZkmVFMve6nqDF0i6YHsscD+Bl0uqZE4jwf0kvbe9JNWH4I2W9CgPrmc63ZY0MaVT5P504AvQQ9LPPDgq1tk2CkiUyWslC8hUSddtjwIqCoEjkqq1/Tero2SeA+bVgMfrMiXzqKQ1qWTeAkJ59OWR2S5V1CSGAYMy8GgYu3JNYqWklnaaxJb0XYRqlrQjK6hsheoTVgELMx8fAtal53xbjGoV7nQF7gHj222LbdgcY02ZQSCAq1KcGAAmSnqZj1tKce5CRUE4CEQ3q66i0Se60mxJr4vEdBhcDWJ7ZhqDBsQRSDqf0ieGvRgcdkr6XsvBToMTJNTHONs60DV8vG3rLpTZ+yvFZQANsfpvwL8AhGKFLtynlkEAAAAASUVORK5CYII="
                : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAA2BJREFUSEvFl1vIplMUx38/xBTJYabGBSLcKTdoREMzhsyMci4Jw4WmZhJK5gIzSA45SxQ55VAoU0MO0zeTQ+Zi4krcIJoLRI1TJCytt/187feZ/cz3fiN9++r99rP2+u219n+vtT+Zo+EccdkFHBEHqj//3xsaA0fEkcA24Ab1xZngETEPOEz9qrONiIPUnTOtnQZHxD7Ap8BxwD/A+erGIQcRcTbwLDAfWKJuTduI+AV4ALhD/XNofT/iq4Eni/HfwHL17XpxROwPPASkbTc2qOsLOMrk52X9ly1464xr+O/AWer7xekZwDPAET1nNTg33m1qB3Cq+nUf3lR1RNTwX4EVwAXA2srBE8A15e9pcNngJeUY9gO2A4vUv2r44HXqwes1PwBXqm9ERJfWOuJ982wj4nrgvrJwvbqhCY6IvYGngC1qiiaFUkeeUx8D56jf9c6zBj+troqIDGoKOB34AzhWzdSPRq3q5cCmoujL1ReK86uK4NI2zzzBnYJbEedcivLNiDgB+KSwHlSva4FvBm4rHxar73VGEZHwzEaOhK9QpwZSneBt6qKy8bwVy4Cd6sEtcF6HW0dp0Jba+/CVwOa+uKrNZGH5NiIuA54vdseoX/RTvVtwlfYu8jy3rFw5Wvf4QvW1iDi5VMO0O099fdbgxpl3mWuBs+zeHxELgO+L4bXqw3sELvC+2u9S15VvneBuVO/tgVerj+8xeCDtK9XN1RlfpL4aEYuB0S0ATlM/+E/gITjwboHMV3+MiNXAY2UuO9dPffAtKZJikDW5G5m6j4Y6Te+qdYKbUpeUzaXy8/cO9fDOaV1Asr6+XAHrnymOK9S3Wt8bFe4m9e6IOAX4sKy5Xc3gRqMG7wW8BFw8AM/pvEqpzN9KNMvUdwbSfmapC0sz2uzzahafcfB0XiOO7rW9o4B7SsNPs2+AVaVypaORqBrw7GoHFL+jO10HNNFjLyIOLQKps/EosKY0gKXqKKWNtG9XT+xncSJwlY1zS8PIolCPfj+uG0uK81J1TD+zApeIDgEeSWcVeQxcpT1fI8lIePbw5wbPeDfCGvsUEdlG0/HCFKT6Sn9tL+2fAcer+Zbb9V09KbiKPotC80FXRX4ncJKawmyrejbgSW1b/yTM+ownhc1kN2fgfwGw0qcumjNgjwAAAABJRU5ErkJggg=="
            }
          />
          <span className="text-white text-sm">Music</span>
        </div>
      )}
    </header>
  );
};
