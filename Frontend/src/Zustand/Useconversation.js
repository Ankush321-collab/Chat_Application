import { create } from 'zustand'

const Useconversation = create((set) => ({
  selectedconvo: null,
  setselectedconvo: (selectedconvo) => set({selectedconvo}),
  messages:[],
  setmessages:(messages)=>set({messages})
  
}))

export default Useconversation
