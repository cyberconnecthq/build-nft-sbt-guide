import React, { useEffect, useState } from "react";
import Image from "next/image";
import CollectBtn from "../Buttons/CollectBtn";
import { IBadgeCard } from "../../types";
import { parseURL } from "../../helpers/functions";
import { BsCalendar2Event } from "react-icons/bs";
import { GoLocation } from "react-icons/go";
import { BsFillMicFill } from "react-icons/bs";

export const BadgeCard = ({ essenceID, profileID, tokenURI, name }: IBadgeCard) => {
    const [data, setData] = useState({
        image: "",
        image_data: "",
        attributes: []
    });

    useEffect(() => {
        if (!tokenURI) return;
        (async () => {
            setData({
                image: "",
                image_data: "",
                attributes: []
            });
            try {
                const res = await fetch(parseURL(tokenURI));
                if (res.status === 200) {
                    const data = await res.json();
                    setData(data);
                }
            } catch (error) {
                console.error(error);
            }
        })();
    }, [tokenURI]);

    return (
        <div className="badge-card">
            <div className="badge-card-img center">
                {data.image_data && <Image src={data.image_data} alt="badge" width={400} height={400} />}
            </div>
            {
                data.attributes.length > 0 &&
                <div>
                    <div className="badge-card-title">{data.attributes[0]["value"]}</div>
                    <div className="badge-card-detail">
                        <div><BsFillMicFill /></div>
                        <div>{name}</div>
                    </div>
                    <div className="badge-card-detail">
                        <div><GoLocation /></div>
                        <div>{data.attributes[2]["value"]}</div>
                    </div>
                    <div className="badge-card-detail">
                        <div><BsCalendar2Event /></div>
                        <div>{data.attributes[1]["value"] && new Date(data.attributes[1]["value"]).toLocaleDateString()}</div>
                    </div>
                </div>
            }
            <CollectBtn
                profileID={profileID}
                essenceID={essenceID}
            />
        </div>
    );
};