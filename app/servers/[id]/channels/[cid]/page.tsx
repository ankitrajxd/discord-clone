"use client";
import React, { useState } from "react";
import * as Icons from "@/app/components/Icons";
import Link from "next/link";
import { data } from "@/app/data";
import { useParams } from "next/navigation";


const Server1 = () => {
  const { id, cid } = useParams();
  const channelID = +cid!;
  const serverID = +id!;
  const server = data[serverID];
  // finding the channel
  const channel = server.categories
    .map((c) => c.channels)
    .flat()
    .find((c) => c.id === +channelID!);

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
          {data[serverID].label}
          <Icons.Chevron className="size-[18px] ml-auto opacity-80" />
        </button>

        {/* channel */}
        <div className="text-gray-300  flex-1 overflow-y-scroll mt-[12px] scrollbar-hide font-medium space-y-[21px]">
          {data[serverID].categories.map((category) => (
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
                    const categoryOpen = !closedCategories.includes(category.id);
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

      <div className="bg-gray-700 flex-1 flex-shrink min-w-0 flex flex-col">
        <div className="px-2 h-12 flex items-center shadow-md">
          <div className="flex items-center">
            <Icons.Hashtag className="size-5 font-semibold text-gray-400 mx-2" />
            <span className="text-white font-semibold mr-2 text-nowrap">
              {channel?.label}
            </span>
          </div>

          {channel?.description && (
            <>
              <div className="w-px h-6 bg-white/[.06] mx-2"></div>
              <div className=" mx-2 text-sm truncate  font-medium text-gray-200">
                {channel?.description}
              </div>
            </>
          )}

          <div className="flex items-center ml-auto">
            <button className="text-gray-200 hover:text-gray-100">
              <Icons.HashtagWithSpeechBubble className="size-6  mx-2" />
            </button>
            <button className="text-gray-200 hover:text-gray-100">
              <Icons.Bell className="size-6  mx-2" />
            </button>
            <button className="text-gray-200 hover:text-gray-100">
              <Icons.Pin className="size-6  mx-2" />
            </button>
            <button className="text-gray-200 hover:text-gray-100">
              <Icons.People className="size-6  mx-2" />
            </button>

            <div className="mx-2 relative">
              <input
                type="text"
                className="bg-gray-900 border-none h-6 w-36 rounded text-sm font-medium placeholder-gray-400 px-1.5"
                placeholder="Search"
              />

              <div className="absolute right-0 inset-y-0 flex items-center">
                <Icons.Spyglass className="size-4 mr-1.5 text-gray-400" />
              </div>
            </div>

            <button className="text-gray-200 hover:text-gray-100">
              <Icons.Inbox className="size-6  mx-2" />
            </button>
            <button className="text-gray-200 hover:text-gray-100">
              <Icons.HashtagWithSpeechBubble className="size-6  mx-2" />
            </button>
            <button className="text-gray-200 hover:text-gray-100">
              <Icons.QuestionCircle className="size-6  mx-2" />
            </button>
          </div>
        </div>
        <div className="  flex-1 overflow-y-scroll scrollbar-hide ">
          {channel?.messages.map((message, i) => (
            <div key={message.id}>
              {i === 0 || message.user !== channel?.messages[i - 1].user ? (
                <MessageWithUser message={message} />
              ) : (
                <Message message={message} />
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Server1;

function ChannelLink({ channel }) {
  const { id, cid } = useParams();
  const Icon =
    channel.icon && Icons[channel.icon] ? Icons[channel.icon] : Icons.Hashtag;

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

function MessageWithUser({ message }) {
  return (
    <div className="leading-[22px] mt-[17px] flex pl-4 pr-16 py-0.5 hover:bg-gray-950/[.07]">
      <img
        className="w-10 h-10 mr-4 rounded-full mt-0.5"
        src={message.avatarUrl}
        alt=""
      />
      <div>
        <p className="flex items-baseline">
          <span className="mr-2 font-medium text-green-400">
            {message.user}
          </span>
          <span className="text-xs font-medium text-gray-400">
            {message.date}
          </span>
        </p>
        <p className="text-gray-100">{message.text}</p>
      </div>
    </div>
  );
}

function Message({ message }) {
  return (
    <div className="pl-4 pr-16 py-0.5 hover:bg-gray-950/[.07] leading-[22px]">
      <p className="text-gray-100 pl-14">{message.text}</p>
    </div>
  );
}
