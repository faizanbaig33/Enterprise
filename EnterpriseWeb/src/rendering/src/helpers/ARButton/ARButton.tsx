import { useState } from 'react';
import classNames from 'classnames';
import { FaSms } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { Foundation } from 'src/.generated/Foundation.EnterpriseWeb.model';
import { Button } from '../Button';
import { Feature } from 'src/.generated/Feature.EnterpriseWeb.model';
import Modal from '../Modal';

export type ARButtonProps = Foundation.EnterpriseWeb.Core.FieldSets.ARButton & {
  classes: {
    wrapper: string;
    cta1Classes: string;
  };
};

const ARButton = ({ fields, classes }: ARButtonProps): JSX.Element => {
  const modalTargetId = 'arModal';
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const handleClickSMS = () => {
    setMessage('');
    if (phone) {
    } else {
      setMessage('Please enter a valid phone number.');
    }
  };

  const handleClickEmail = () => {
    setMessage('');
    if (email && email.includes('@')) {
      window.location.href = `mailto:${email}`;
    } else {
      setMessage('Please enter a valid email.');
    }
  };

  return (
    <>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div>
            <div className="min-h-[300px] min-w-[400px]">
              {/* <model-viewer
                className="model-viewer"
                src={fields?.gltfLink?.value?.url}
                ios-src={fields?.usdzLink?.value?.src}
                poster={fields?.posterImage?.value?.url}
                alt="windows"
                exposure="0.008"
                camera-controls
                ar
                quick-look-browsers="safari chrome"
                camera-orbit="0deg 90deg"
                ar-modes="webxr"
                tabindex="0"
                ar-status="not-presenting"
                style={{
                  width: '100%',
                  height: '100%'
                }}
              ></model-viewer> */}
              <model-viewer
                id="viewer"
                shadow-intensity="1"
                src="https://rbawebsite-assets.azurewebsites.net/webassets/400Hinged.gltf"
                ios-src="https://rbawebsite-assets.azurewebsites.net/webassets/400Hinged.usdz"
                data-ar
                camera-controls=""
                quick-look-browsers="safari chrome"
                camera-orbit="0deg 90deg"
                poster="https://aw930cdnprdcd.azureedge.net/-/media/andersenwindows/images/windows-and-doors/doors/patio-doors-hinged/400-series-frenchwood-hinged-doors/400_frenchwood_hinged_door-cat.png?modified=20171218194821"
                class="model-viewer"
                ar-status="not-presenting"
              ></model-viewer>
            </div>
            <p className="mt-2 text-[14px]">
              *Unfortunately AR is not available on desktop devices. Please send to a mobile device
              via text message or email.
            </p>
            {message && <div className="my-2 text-[13px] text-red-500">{message}</div>}
            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="xxx-xxx-xxxx"
                  className="w-full rounded-sm border border-[#b9b9b9]"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <div
                  className="ml-2 flex h-[40px] min-w-[40px] cursor-pointer items-center justify-center rounded-[6px] bg-primary"
                  onClick={handleClickSMS}
                >
                  <FaSms size={25} color="white" />
                </div>
              </div>
              <div className="flex items-center">
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full rounded-sm border border-[#b9b9b9]"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div
                  className="ml-2 flex h-[40px] min-w-[40px] cursor-pointer items-center justify-center rounded-[6px] bg-primary"
                  onClick={handleClickEmail}
                >
                  <MdEmail size={25} color="white" />
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
      <div
        className={classNames(
          classes?.wrapper,
          'mb-s flex items-start md:flex-row md:items-center md:space-x-4'
        )}
      >
        {fields?.cta1Link && (
          <div onClick={() => setShowModal(true)}>
            <Button
              field={fields?.cta1Link}
              variant={fields?.cta1Style}
              icon={fields?.cta1Icon}
              data-modal-target={modalTargetId}
              data-modal-toggle={modalTargetId}
              modalId={
                (
                  fields?.cta1Modal as unknown as Feature.EnterpriseWeb.Components.Modal.GenericModal.GenericModal
                )?.fields?.modalId?.value
              }
              modalLinkText={fields?.cta1ModalLinkText}
              classes={classes?.cta1Classes}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default ARButton;
