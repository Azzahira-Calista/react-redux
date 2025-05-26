import LoadingBar from 'react-top-loading-bar';
import { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function Loading() {
  const loading = useSelector((state) => state.loading);
  const ref = useRef(null);

  useEffect(() => {
    if (loading) {
      ref.current.continuousStart();
    } else {
      ref.current.complete();
    }
  }, [loading]);

  return <LoadingBar color="#f11946" ref={ref} />;
}
