
declare var $: any;
export const showDialog = function(from, align, noti_type, message, time) {
  // let type = ['','info','success','warning','danger'];

  $.notify({
      icon: "ti-gift",
      message: message
    },{
        type:  noti_type,
        timer: time,
        placement: {
            from: from,
            align: align
        }
  });
}
