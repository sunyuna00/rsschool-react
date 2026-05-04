import React from 'react';

export class Spinner extends React.Component {
  override render() {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }
}
