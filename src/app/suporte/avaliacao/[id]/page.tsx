'use client';

function Rating({ params }: { params: { id: string } }) {
  return <section>{params.id}</section>;
}

export default Rating;
