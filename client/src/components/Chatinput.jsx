import React,{useEffect,useState} from "react";

const Chatinput = ({handleSendMsg}) => {
  const [msg, setMsg] = useState("");
  const sendChat = (e) => {
    e.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };
 return (
    <>
      <div className="chat-footer border-top py-4 py-lg-6 px-lg-8">
        <div className="container-xxl">
          <form  onSubmit={(e) => sendChat(e)}>
            <div className="form-row align-items-center">
              <div className="col">
                <div className="input-group">
                  <input
                    className="form-control bg-transparent border-0"
                    placeholder="Type your message..."
                    onChange={(e) => setMsg(e.target.value)}
                    value={msg}
                  />

                  <div className="input-group-append">
                    <button
                      className="btn btn-ico btn-secondary btn-minimal bg-transparent border-0"
                      type="button"
                      data-emoji-btn=""
                    >
                      <img
                        src="assets/images/smile.svg"
                        data-inject-svg=""
                        alt=""
                      />
                    </button>
                  </div>
                  <div className="input-group-append">
                    <button
                      className="btn btn-ico btn-secondary btn-minimal bg-transparent border-0 dropzone-button-js"
                      type="button"
                    >
                      <img
                        src="assets\images\paperclip.svg"
                        data-inject-svg=""
                        alt=""
                      />
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-auto">
                <button
                  className="btn btn-ico btn-primary rounded-circle"
                  type="submit"
                >
                  <span className="fe-send"></span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Chatinput;
