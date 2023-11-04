import React, { useMemo } from "react";
import "./ProfileImage.scss";


export interface ProfileImageProps {
    src: string;
}

const ProfileImage = (props: ProfileImageProps) => {


    return <img src={props.src} />
};

export default ProfileImage;
