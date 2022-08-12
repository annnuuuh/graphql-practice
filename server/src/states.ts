interface State {
  id: string;
  name: string;
  isActive: boolean;
}

export const states: State[] = [
  {
    id: "001",
    name: "Arizona",
    isActive: true,
  },
  {
    id: "002",
    name: "California",
    isActive: false,
  },
  {
    id: "003",
    name: "Texas",
    isActive: true,
  },
];
