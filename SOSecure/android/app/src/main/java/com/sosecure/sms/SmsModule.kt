package com.sosecure.sms

import android.Manifest
import android.app.Activity
import android.content.pm.PackageManager
import android.telephony.SmsManager
import androidx.core.app.ActivityCompat
import com.facebook.react.bridge.*
import com.facebook.react.module.annotations.ReactModule

@ReactModule(name = SmsModule.NAME)
class SmsModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
  companion object {
    const val NAME = "SmsModule"
    private const val REQUEST_CODE = 9912
  }

  override fun getName(): String = NAME

  @ReactMethod
  fun sendSms(phoneNumber: String, message: String, promise: Promise) {
    try {
      val currentActivity: Activity? = currentActivity
      if (currentActivity == null) {
        promise.reject("NO_ACTIVITY", "No current activity available")
        return
      }

      val permission = ActivityCompat.checkSelfPermission(currentActivity, Manifest.permission.SEND_SMS)
      if (permission != PackageManager.PERMISSION_GRANTED) {
        ActivityCompat.requestPermissions(currentActivity, arrayOf(Manifest.permission.SEND_SMS), REQUEST_CODE)
        promise.reject("PERMISSION", "SEND_SMS permission not granted")
        return
      }

      val smsManager = SmsManager.getDefault()
      val parts = smsManager.divideMessage(message)
      smsManager.sendMultipartTextMessage(phoneNumber, null, parts, null, null)
      promise.resolve(true)
    } catch (e: Exception) {
      promise.reject("SMS_ERROR", e.message, e)
    }
  }
}