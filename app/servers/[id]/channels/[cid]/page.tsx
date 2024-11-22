"use client";
import React, { useState } from "react";
import * as Icons from "@/app/components/Icons";
import Link from "next/link";
import data from "@/app/data.json";
import { useParams } from "next/navigation";

const Server1 = () => {
  const [closedCategories, setClosedCategories] = useState([]);
  function toggleCategory(categoryId) {
    setClosedCategories((prev) => {
      if (prev.includes(categoryId)) {
        return prev.filter((id) => id !== categoryId);
      }
      return [...prev, categoryId];
    });
  }

  return (
    <>
      <div className="bg-gray-800 w-60 flex flex-col">
        <button className="px-4 h-12 flex items-center shadow-md font-poppins font-semibold text-[15px] text-white hover:bg-gray-550/[0.16] transition">
          <div className="relative size-4 mr-1">
            <Icons.Verified className="absolute size-4 text-gray-550" />{" "}
            <Icons.Check className="absolute size-4" />
          </div>
          Tailwind CSS
          <Icons.Chevron className="size-[18px] ml-auto opacity-80" />
        </button>

        {/* channel */}
        <div className="text-gray-300  flex-1 overflow-y-scroll mt-[12px] scrollbar-hide font-medium space-y-[21px]">
          {data[1].categories.map((category, index) => (
            <div key={category.id}>
              {category.label && (
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="flex items-center px-0.5 text-xs font-poppins uppercase tracking-wide hover:text-gray-100 w-full"
                >
                  <Icons.Arrow
                    className={`${
                      closedCategories.includes(category.id) ? "-rotate-90" : ""
                    }  size-3 mr-0.5 transition duration-200`}
                  />
                  {category.label}
                </button>
              )}

              <div className="space-y-0.5 mt-[5px]">
                {category.channels
                  .filter((channel) => {
                    let categoryOpen = !closedCategories.includes(category.id);
                    return categoryOpen || channel.unread;
                  })
                  .map((channel) => (
                    <ChannelLink channel={channel} key={channel.id} />
                  ))}
              </div>
            </div>
          ))}

          {/* dynamic channel */}
        </div>
      </div>

      <div className="bg-gray-700 flex-1 flex flex-col">
        <div className="px-3 h-12 flex items-center shadow-md">general</div>
        <div className=" p-3 flex-1 overflow-y-scroll scrollbar-hide space-y-4">
          {[...Array(40)].map((a, index) => (
            <p key={index}>
              Message {index} Lorem, ipsum dolor sit amet consectetur
              adipisicing elit. In velit, sunt hic beatae illum placeat quia at,
              iusto, aut voluptatem ab sit quae iste repudiandae atque illo quos
              nemo? Quod? Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Delectus nisi consequuntur laudantium maxime neque sit
              molestias qui dolorem quibusdam hic. Quos labore quod magnam atque
              veniam assumenda maxime reprehenderit iusto!
            </p>
          ))}
        </div>
      </div>
    </>
  );
};

export default Server1;

function ChannelLink({ channel }) {
  const { id, cid } = useParams();
  const Icon = channel.icon ? Icons[channel.icon] : Icons.Hashtag;
  const active = +cid! === +channel.id;
  const state = active
    ? "active"
    : channel.unread
    ? "inactiveUnread" // Changed to match the classes object
    : "inactiveRead";

  const classes = {
    active: "text-white bg-gray-550/[0.32]",
    inactiveUnread:
      "text-white hover:bg-gray-550/[0.32] active:bg-gray-550/[0.24]", // Changed to match the state
    inactiveRead: "text-gray-300 hover:text-gray-100 hover:bg-gray-550/[0.16]",
  };

  return (
    <Link
      key={channel.id}
      href={`/servers/${id}/channels/${channel.id}`}
      className={`${classes[state]} flex relative  items-center mx-2 px-2 py-1 rounded group`}
    >
      {state === "inactiveUnread" && (
        <div className="absolute left-0 w-1 h-2 bg-white -ml-2 rounded-r-full"></div>
      )}
      <Icon className="size-5 text-gray-400 mr-1.5" />
      {channel.label}
      <Icons.AddPerson className="size-4 ml-auto text-gray-200 opacity-0 group-hover:opacity-100 hover:text-gray-100" />
    </Link>
  );
}
