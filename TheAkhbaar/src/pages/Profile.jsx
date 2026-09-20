import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {FileText,Bookmark,Clock3,Sparkles,Rocket,} from "lucide-react";
import { useAuth } from "../Contexts/AuthContext";
import { BookmarkContext } from "../Contexts/BookmarkContext";
import { HistoryContext } from "../Contexts/HistoryContext"; 

const Profile = () => {
  const navigate = useNavigate();

  const { user } = useAuth();
  const { bookmarks = [] } = useContext(BookmarkContext);
  const { history = [] } = useContext(HistoryContext); 

  const displayName = user?.displayName || user?.email?.split("@")[0] || "User";

  const email = user?.email || "user@example.com";

  const photoURL = user?.photoURL;

  const initials = displayName.split(" ").map((word) => word.charAt(0)).join("").slice(0, 2).toUpperCase();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0F172A] px-4 sm:px-6 lg:px-8 py-6">
      <div className="max-w-7xl mx-auto">
        <section className="relative overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">

          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1600&q=80')",
            }}
          />

          <div className="absolute inset-0 bg-slate-900/55" />

          <div className="relative min-h-[190px] sm:min-h-[220px] flex items-center px-6 sm:px-10 py-8">

            <div className="flex items-center gap-5 sm:gap-7">

              <div className="flex-shrink-0">

                {photoURL ? (
                  <img
                    src={photoURL}
                    alt={displayName}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-white shadow-lg"
                  />
                ) : (
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 border-2 border-white shadow-lg flex items-center justify-center">
                    <span className="text-2xl sm:text-3xl font-semibold text-white">
                      {initials}
                    </span>
                  </div>
                )}

              </div>

              <div className="text-white">

                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                  Hi {displayName}!
                </h1>

                <p className="mt-1 text-sm sm:text-base text-slate-100">
                  Welcome to TheAkhbaar
                </p>

                <p className="mt-3 max-w-lg text-xs sm:text-sm leading-relaxed text-slate-200">
                  Your personalized space for the latest news, insights
                  <br className="hidden sm:block" />
                  and stories from around the world.
                </p>

              </div>

            </div>
          </div>
        </section>

        <section className="mt-4 bg-white dark:bg-[#111827] rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">

          <div className="flex items-center gap-5 px-6 py-5">
            {photoURL ? (
              <img
                src={photoURL}
                alt={displayName}
                className="w-14 h-14 rounded-full object-cover"
              />
            ) : (
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center">
                <span className="text-lg font-semibold text-white">
                  {initials}
                </span>
              </div>
            )}

            <div>
              <h2 className="text-base font-semibold text-slate-900 dark:text-white">
                {displayName}
              </h2>

              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {email}
              </p>
            </div>

          </div>
        </section>


        <section className="mt-4 bg-white dark:bg-[#111827] rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm px-6 sm:px-7 py-6">

          <div>
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">
              About TheAkhbaar
            </h2>

            <p className="mt-2 max-w-3xl text-xs sm:text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              TheAkhbaar is your go-to platform for reliable, up-to-date news
              and in-depth coverage on topics that matter. We bring you
              curated stories from around the world — all in one place.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-7">

            <div className="flex gap-4">

              <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
                <FileText
                  size={19}
                  className="text-blue-600 dark:text-blue-400"
                />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                  Latest News
                </h3>

                <p className="mt-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                  Stay updated with real-time news from trusted sources.
                </p>
              </div>

            </div>

            <div className="flex gap-4">

              <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
                <Bookmark
                  size={19}
                  className="text-blue-600 dark:text-blue-400"
                />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                  Save for Later
                </h3>

                <p className="mt-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                  Bookmark articles you want to read anytime.
                </p>

                {bookmarks.length > 0 && (
                  <button
                    onClick={() => navigate("/bookmarks")}
                    className="mt-2 text-[11px] font-medium text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {bookmarks.length} saved article
                    {bookmarks.length !== 1 ? "s" : ""}
                  </button>
                )}
              </div>

            </div>

            <div className="flex gap-4">

              <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
                <Clock3
                  size={19}
                  className="text-blue-600 dark:text-blue-400"
                />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                  Reading History
                </h3>

                <p className="mt-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                  Never lose track of the stories you've read.
                </p>

                {history.length > 0 && (
                  <button
                    onClick={() => navigate("/history")}
                    className="mt-2 text-[11px] font-medium text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {history.length} read article
                    {history.length !== 1 ? "s" : ""}
                  </button>
                )}
              </div>

            </div>

            <div className="flex gap-4">

              <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
                <Sparkles
                  size={19}
                  className="text-blue-600 dark:text-blue-400"
                />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                  Personalized Experience
                </h3>

                <p className="mt-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                  Get recommendations based on your interests.
                </p>
              </div>

            </div>

          </div>

          <div className="mt-7 rounded-lg bg-gradient-to-r from-blue-50 to-slate-50 dark:from-blue-950/40 dark:to-slate-900/40 border border-blue-100 dark:border-blue-900/40 px-5 py-4">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

              <div className="flex items-center gap-4">

                <div className="w-10 h-10 rounded-lg bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center">
                  <Rocket
                    size={21}
                    className="text-blue-600 dark:text-blue-400"
                  />
                </div>

                <div>
                  <h3 className="text-sm sm:text-sm font-semibold text-slate-800 dark:text-white">
                    Explore. Learn. Stay Informed.
                  </h3>

                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    With TheAkhbaar, you're always one step ahead.
                  </p>
                </div>

              </div>


              <button
                onClick={() => navigate("/")}
                className="w-full sm:w-auto px-5 py-2.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium transition-colors shadow-sm"
              >
                Start Exploring →
              </button>

            </div>

          </div>

        </section>

      </div>
    </div>
  );
};

export default Profile;