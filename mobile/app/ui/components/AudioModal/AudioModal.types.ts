export type AudioModalProps = {
  isOpen: boolean;
  setIsOpen: Function;
  isPermissionGranted: boolean;
  time: string;
  onStart: Function;
  onStop: Function;
  isRecording: boolean;
  duration?: string;
};
