import React from "react";

const Changelog = ({ children, date }) => {
  return (
    <section className="section changelogs pt-0">
      <div className="container">
        <div className="flex flex-wrap justify-center">
          <div className="w-full lg:w-10/12">
            <div className="flex flex-wrap mb-10 lg:mt-0">
              <div className="w-full lg:w-1/4">
                <h6 className="mb-4 pl-7 text-lg lg:mt-0 lg:pl-0">{date}</h6>
              </div>
              <div className="border-border w-full lg:w-3/4 lg:border-l lg:pb-10 lg:pl-10">
                <div className="changelogs-content rounded-xl bg-white p-6 shadow-lg lg:p-10">
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Changelog;
