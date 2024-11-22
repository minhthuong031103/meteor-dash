import { RocketIcon } from "lucide-react";
import React from "react";

type Props = {
  player: {
    id: string;
    rocketLeft: number;
    degrees: number;
    isColliding: boolean;
  };
};

const OtherPlayerRocket = ({ player }: Props) => {
  return (
    <div
      className={`${player.isColliding && "wiggle"}`}
      style={{
        position: "absolute",
        left: player.rocketLeft,
        transition: "all",
        animationDuration: "10ms",
        marginTop: "500px",
        opacity: 0.5,
      }}
    >
      <div className="rocket-shadow">
        <RocketIcon
          size={32}
          className="fill-blue-600"
          style={{
            transform: `rotate(${-45 - player.degrees / 3}deg)`,
            transition: "all",
            animationDuration: "10ms",
          }}
        />
      </div>
    </div>
  );
};

export default OtherPlayerRocket;
