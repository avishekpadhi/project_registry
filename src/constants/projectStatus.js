export const PROJECT_STATUS = {
  ACTIVE: "active",
  ON_HOLD: "on_hold",
  COMPLETED: "completed",
};

export const STATUS_TRANSITIONS = {
  active: ["on_hold", "completed"],
  on_hold: ["active", "completed"],
  completed: [],
};
