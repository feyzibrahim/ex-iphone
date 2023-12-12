export const GOOGLE_ID =
  "628424458787-qkhchkq95n7ht13oneer3692talfp63f.apps.googleusercontent.com";

export const config = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};
export const appJson = {
  "Content-Type": "application/json",
};

export const multiForm = {
  "Content-Type": "multipart/form-data",
};
export const configMultiPart = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
  withCredentials: true,
};

export const handleError = (error, rejectWithValue) => {
  if (error.response && error.response.data.error) {
    console.log(error.response.data.error);

    return rejectWithValue(error.response.data.error);
  } else {
    return rejectWithValue(error.message);
  }
};

export const lineChartNoDecoration = {
  plugins: {
    legend: { display: false },
  },
  scales: {
    x: {
      display: false,
    },
    y: {
      display: false,
    },
  },
};

export const lineChartNoGridNoLegend = {
  maintainAspectRatio: false,
  plugins: {
    legend: false,
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        display: false,
      },
    },
  },
};
