import { loadEvent, socketConfig } from "@mix/socket";

loadEvent({
    require: [
        require("@events/socket")
    ]
})

export default socketConfig
