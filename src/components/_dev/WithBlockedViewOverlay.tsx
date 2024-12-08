import { ReactNode } from "react";

const WithBlockedViewOverlay = ({
  children,
  notice,
}: {
  children: ReactNode;
  notice: ReactNode;
}): JSX.Element => {
  const hasPermission = process.env.NODE_ENV !== "production";

  return (
    <div className="relative">
      {/* Render children components if the user has the required permission */}
      <div className={hasPermission ? "" : "pointer-events-none"}>
        {children}
      </div>
      {/* Display an overlay with an unauthorized message if the user does not have the required permission */}
      {!hasPermission && (
        <div className="absolute inset-0 rounded-xl bg-background bg-opacity-70 z-10 pointer-events-auto">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11/12 md:w-3/4">
            {notice}
          </div>
        </div>
      )}
    </div>
  );
};

export default WithBlockedViewOverlay;
